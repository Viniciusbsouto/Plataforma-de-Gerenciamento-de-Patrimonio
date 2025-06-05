import React from 'react';
import styles from './UserStatsGraphs.module.css';
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTooltip,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

const UserStatsGraphs = ({ balanceData = [] }) => {
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    if (!balanceData || balanceData.length === 0) {
      setGraph([]);
      setTotal(0);
      return;
    }

    const graphData = balanceData.map((item) => ({
      x: item.instituicao,
      y: Number(item.valor),
      label: `${item.instituicao}\nR$ ${Number(item.valor).toFixed(2)}`,
    }));

    const totalValor = balanceData
      .map(({ valor }) => Number(valor))
      .reduce((a, b) => a + b, 0);

    setGraph(graphData);
    setTotal(totalValor);
  }, [balanceData]);

  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p style={{ color: '#fff' }}>Total: R$ {total.toFixed(2)}</p>
      </div>

      <div className={styles.graphItem}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          labelRadius={110} // 👈 força os nomes para fora das fatias
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          colorScale={['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF6EC7']}
          labels={({ datum }) => datum.x}
          labelComponent={
            <VictoryTooltip
              flyoutStyle={{
                fill: '#222',
                stroke: '#4D96FF',
                strokeWidth: 2,
                borderRadius: 8,
                boxShadow: '0 0 10px rgba(0,0,0,0.5)',
              }}
              style={{ fill: '#fff', fontSize: 14, fontWeight: 'bold' }}
              constrainToVisibleArea
              text={({ datum }) => `${datum.x}\nR$ ${datum.y.toFixed(2)}`}
            />
          }
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fill: '#fff',
              fontSize: 14,
              fontWeight: 'bold',
            },
          }}
        />
      </div>

      <div className={styles.graphItem}>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            style={{
              axis: { stroke: '#ccc' },
              tickLabels: { fill: '#ccc' },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: '#ccc' },
              tickLabels: { fill: '#ccc', fontWeight: 'bold', fontSize: 14 },
            }}
          />
          <VictoryBar
            alignment="middle"
            data={graph}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{ fill: '#333', stroke: '#fff' }}
                style={{ fill: '#fff', fontWeight: 'bold', fontSize: 14 }}
              />
            }
            style={{
              data: {
                fill: '#4D96FF',
                stroke: '#fff',
                strokeWidth: 1,
              },
            }}
          />
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
