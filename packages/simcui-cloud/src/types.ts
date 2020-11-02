export type QueuePayloadInCharacter = {
  type: 'character';
  params: {
    realm: string;
    region: 'us' | 'eu';
    name: string;
  };
};

export type QueuePayloadInSpell = {
  type: 'spell';
  params: {
    region: 'us' | 'eu';
    spellId: number;
  };
};

export type QueuePayloadInItem = {
  type: 'item';
  params: {
    region: 'us' | 'eu';
    itemId: number;
  };
};

export type QueuePayloadIn = QueuePayloadInCharacter | QueuePayloadInSpell | QueuePayloadInItem;

export type QueueInsertEventBody<T> = {
  body: T;
};

export type QueueInsertEvent = QueueInsertEventBody<QueuePayloadIn>;

export type QueueInsertCachedResponse<T = any> = {
  cache: T;
};

export type QueueInsertResponse = {
  token: string;
  waitTimeSeconds: number;
};

export type QueueLookupEvent = {
  queryStringParameters: {
    token: string;
  };
};

export type QueueLookupResponse<T = any> = {
  token: string;
  status: 'QUEUE' | 'DONE';
  payload: T;
};

export type QueueWorkerEvent = {
  input: string;
};

export type QueueWorkerInput = {
  token: string;
  wait_time: number;
};
