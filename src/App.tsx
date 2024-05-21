import { useCallback, useState } from 'react'

function App() {
  const [flagA, setFlagA] = useState<boolean>(false);
  const [flagB, setFlagB] = useState<boolean>(false);
  const [flagC, setFlagC] = useState<boolean>(false);
  const [flagD, setFlagD] = useState<boolean>(false);
  const toggleFlagA = () => setFlagA(f => { console.log('flagA:', f, '=>', !f); return !f; });
  const toggleFlagB = () => setFlagB(f => { console.log('flagB:', f, '=>', !f); return !f; });
  const toggleFlagC = () => setFlagC(f => { console.log('flagC:', f, '=>', !f); return !f; });
  const toggleFlagD = () => setFlagD(f => { console.log('flagD:', f, '=>', !f); return !f; });

  /**
   * A はどちらも依存配列にフラグなし
   */
  const onClickButtonA = useCallback(() => { callbackA(); }, []);
  const callbackA = useCallback(() => { console.log('flagA:', flagA); }, []);

  /**
   * B は呼ぶ側だけ依存配列にフラグあり
   */
  const onClickButtonB = useCallback(() => { callbackB(); }, [flagB]);
  const callbackB = useCallback(() => { console.log('flagB:', flagB); }, []);

  /**
   * C は呼ばれる側だけ依存配列にフラグあり
   */
  const onClickButtonC = useCallback(() => { callbackC(); }, []);
  const callbackC = useCallback(() => { console.log('flagC:', flagC); }, [flagC]);

  /**
   * D は呼ぶ側も呼ばれる側も依存配列にフラグあり
   */
  const onClickButtonD = useCallback(() => { callbackD(); }, [flagD]);
  const callbackD = useCallback(() => { console.log('flagD:', flagD); }, [flagD]);

  return (<div style={styles.container}>
    <div style={styles.title}>
      useCallback地獄を垣間見よう！
    </div>
    <div style={styles.explanation}>
      <ol>
        <li>F12を押してコンソールを表示しましょう。</li>
        <li>onClickButtonA〜Dを押してフラグの状態を確認すると<b>全部false</b>ですね！</li>
        <li>toggleFlagA〜Dを押してフラグの状態を<b>全部true</b>に変更しましょう。</li>
        <li>再度onClickButtonA〜Dを押してフラグの状態を確認しましょう。</li>
        <li><b>Dのみフラグの状態が正しい</b>ことが確認できましたね！</li>
      </ol>
    </div>
    <div style={styles.buttonRow}>
      <button onClick={onClickButtonA}>onClickButtonA</button>
      <button onClick={toggleFlagA}>toggleFlagA</button>
    </div>
    <div style={styles.buttonRow}>
      <button onClick={onClickButtonB}>onClickButtonB</button>
      <button onClick={toggleFlagB}>toggleFlagB</button>
    </div>
    <div style={styles.buttonRow}>
      <button onClick={onClickButtonC}>onClickButtonC</button>
      <button onClick={toggleFlagC}>toggleFlagC</button>
    </div>
    <div style={styles.buttonRow}>
      <button onClick={onClickButtonD}>onClickButtonD</button>
      <button onClick={toggleFlagD}>toggleFlagD</button>
    </div>
  </div>);
}
export default App;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  explanation: {
    marginBottom: 20,
  },
  buttonRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 20,
  }
}