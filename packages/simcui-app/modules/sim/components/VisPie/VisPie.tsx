/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import React from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { Group } from '@visx/group';
import { useTheme } from '@chakra-ui/core';
import { animated, useTransition, interpolate } from 'react-spring';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

type DataType = { label: string; value: number; color?: string };
type DateShape = Array<DataType>;

export interface VisPieProps {
  width: number;
  height: number;
  margin?: typeof defaultMargin;
  data: DateShape;
  colorScheme: string;
}

function VisPie({ width, height, margin = defaultMargin, data, colorScheme = 'orange' }: VisPieProps) {
  const theme = useTheme();

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;
  const donutThickness = 50;

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={d => d.value}
          outerRadius={radius}
          innerRadius={radius - donutThickness}
          cornerRadius={3}
          padAngle={0.005}
        >
          {pie => (
            <AnimatedPie<DataType>
              {...pie}
              animate
              getKey={arc => arc.data.label}
              onClickDatum={() => null}
              getColor={arc => arc.data.color || theme.colors[colorScheme][800]}
              colorScheme={colorScheme}
            />
          )}
        </Pie>
      </Group>
    </svg>
  );
}

export default VisPie;

// -----------------------------

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});

const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  colorScheme: string;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum: (d: PieArcDatum<Datum>) => void;
};

function AnimatedPie<Datum>({
  animate,
  colorScheme,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<Datum>) {
  const theme = useTheme();
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
    arcs,
    getKey,
    // @ts-ignore react-spring doesn't like this overload
    {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition,
    },
  );
  return (
    <>
      {transitions.map(
        ({ item: arc, props, key }: { item: PieArcDatum<Datum>; props: AnimatedStyles; key: string }) => {
          const [centroidX, centroidY] = path.centroid(arc);
          const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.4;

          return (
            <g key={key}>
              <animated.path
                // compute interpolated path d attribute from intermediate angle values
                d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                  path({
                    ...arc,
                    startAngle,
                    endAngle,
                  }),
                )}
                fill={getColor(arc)}
                onClick={() => onClickDatum(arc)}
                onTouchStart={() => onClickDatum(arc)}
              />
              {hasSpaceForLabel && (
                <animated.g style={{ opacity: props.opacity }}>
                  <text
                    fill={theme.colors[colorScheme][50]}
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize="1em"
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {getKey(arc)}
                  </text>
                </animated.g>
              )}
            </g>
          );
        },
      )}
    </>
  );
}
