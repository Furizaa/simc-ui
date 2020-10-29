import React, { useCallback, useMemo } from 'react';
import { AreaClosed, Bar, Line } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { GridColumns } from '@visx/grid';
import { LinearGradient } from '@visx/gradient';
import { curveMonotoneX } from '@visx/curve';
import { AxisLeft, TickFormatter } from '@visx/axis';
import { withTooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import { max } from 'd3-array';
import { Box, Tag, useTheme } from '@chakra-ui/core';

export interface VisDpsOverFightProps {
  width: number;
  height: number;
  data: number[];
}

type TooltipData = { dps: number; time: number };

function VisDpsOverFight({
  width,
  height,
  data,
  showTooltip,
  hideTooltip,
  tooltipData,
  tooltipTop = 0,
  tooltipLeft = 0,
}: VisDpsOverFightProps & WithTooltipProvidedProps<TooltipData>) {
  const theme = useTheme();
  const marginLeft = 50;
  const innerWidth = width - marginLeft;

  const dpsTimeScale = useMemo(
    () =>
      scaleLinear({
        range: [0, innerWidth],
        domain: [0, data.length],
      }),
    [innerWidth, data],
  );

  const dpsValueScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        domain: [0, max(data) || 0],
        nice: true,
      }),
    [height, data],
  );

  // [60, 120, 180, ...length]
  const gridTickValues = useMemo(() => {
    return Array.from(Array(Math.floor(data.length / 60))).map((_, index) => (index + 1) * 60);
  }, [data.length]);

  const axisTickFormat: TickFormatter<any> = (value: number) => `${value}`;

  const handleTooltip = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };
      const correctedX = x - marginLeft;
      const x0 = Math.floor(dpsTimeScale.invert(correctedX));
      showTooltip({
        tooltipData: { dps: data[x0], time: x0 },
        tooltipLeft: correctedX,
        tooltipTop: dpsValueScale(data[x0]),
      });
    },
    [showTooltip, dpsValueScale, dpsTimeScale, data],
  );

  return (
    <Box p="relative">
      <svg width={width} height={height}>
        <LinearGradient
          id="area-gradient"
          from={theme.colors.orange['400']}
          to={theme.colors.orange['700']}
          toOpacity={0.3}
        />
        <g transform={`translate(${marginLeft},0)`}>
          <GridColumns
            top={0}
            scale={dpsTimeScale}
            height={height}
            strokeDasharray="2,5"
            tickValues={gridTickValues}
            stroke={theme.colors.orange['800']}
            strokeOpacity={0.7}
            pointerEvents="none"
          />
          <AreaClosed
            data={data}
            x={(d) => dpsTimeScale(data.indexOf(d)) || 0}
            y={(d) => dpsValueScale(d) ?? 0}
            yScale={dpsValueScale}
            strokeWidth={2}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <AxisLeft
            top={0}
            scale={dpsValueScale}
            tickFormat={axisTickFormat}
            tickLabelProps={() => ({
              fill: theme.colors.orange['400'],
              fontSize: '0.8em',
              textAnchor: 'end',
              dx: '-0.25em',
              dy: '0.25em',
            })}
            hideZero
            tickStroke={theme.colors.orange['400']}
            numTicks={4}
            label="dps"
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: 0 }}
                to={{ x: tooltipLeft, y: height }}
                stroke={theme.colors.yellow['400']}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={theme.colors.yellow['400']}
                stroke={theme.colors.gray['900']}
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
          <Bar
            x={0}
            y={0}
            width={width}
            height={height}
            fill="transparent"
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
        </g>
      </svg>
      {tooltipData && (
        <>
          <Box
            pos="absolute"
            style={{
              top: tooltipTop - 12,
              left: tooltipLeft + marginLeft + 12,
            }}
          >
            <Tag colorScheme="yellow" fontWeight="semibold">
              {Math.ceil(tooltipData.dps)}
            </Tag>
          </Box>
          <Box
            pos="absolute"
            style={{
              top: height + 6,
              left: tooltipLeft + marginLeft,
            }}
          >
            <Tag colorScheme="yellow" fontWeight="semibold">
              {Math.ceil(tooltipData.time)}
            </Tag>
          </Box>
        </>
      )}
    </Box>
  );
}

export default withTooltip<VisDpsOverFightProps, TooltipData>(VisDpsOverFight);
