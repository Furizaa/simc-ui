import { AsyncStore, WOW } from 'types';
import manifest from '@cloud/gatewayManifest.json';

interface Params<T> {
  body: any;
  onUpdate: (entry: AsyncStore<T>) => void;
}

const QUEUE_GRACE_PERIOD_MS = 5000;
const QUEUE_RETRY_PERIOD_MS = 3000;
const QUEUE_RETRY_COUNT = 3;

export default async function fetchQueue<T>(params: Params<T>) {
  const checkQueueStatus = async (token: string, tryCount: number) => {
    const result = await fetch(`${manifest.bnetGatewayEndpoint}queue?token=${token}`);
    const json = (await result.json()) as WOW.QueuedLookupResult<WOW.Result<T>>;

    if (json.status === 'DONE') {
      params.onUpdate({ status: 'done', error: json.payload.error, data: json.payload.data });

      return;
    }
    if (json.status === 'QUEUE' && tryCount <= QUEUE_RETRY_COUNT) {
      setTimeout(() => checkQueueStatus(json.token, tryCount + 1), QUEUE_RETRY_PERIOD_MS);
      return;
    }

    params.onUpdate({ status: 'done', error: { code: 500, text: 'Queue offline.' }, data: null });
  };

  params.onUpdate({ data: null, status: 'loading', error: null });

  const result = await fetch(`${manifest.bnetGatewayEndpoint}queue`, {
    method: 'POST',
    body: JSON.stringify(params.body),
  });
  const json = (await result.json()) as WOW.QueuedResult<T>;

  if ('cache' in json) {
    if (json.cache.data) {
      params.onUpdate({ status: 'done', error: null, data: json.cache.data });
      return;
    }
    params.onUpdate({ status: 'done', error: json.cache.error, data: null });
    return;
  }

  if ('token' in json) {
    params.onUpdate({ status: 'queue', error: null, data: null });
    const queueTime = json.waitTimeSeconds * 1000 + QUEUE_GRACE_PERIOD_MS;
    setTimeout(() => checkQueueStatus(json.token, 0), queueTime);
  }
}
