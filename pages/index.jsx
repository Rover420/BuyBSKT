import Head from 'next/head'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar';

export default function Home() {

  const [currency, setCurrency] = useState('BSKT');
    const [amount, setAmount] = useState(500);
    const [value, setValue] = useState();
    const [disabled, setDisabled] = useState();
    const [timer, setTimer] = useState(0);
    const [list, setList] = useState();
    const [fiat, setFiat] = useState('PLN');



    const rates = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Ari10-Widget-Id': 'aa044660-e663-444f-bc28-87e007c03e78' },
                body: JSON.stringify({ offeredAmount: amount, offeredCurrencyCode: fiat })
            }
            
            const arires = await fetch(
                `https://rk64tcf9ny.eu-west-1.awsapprunner.com/currencies/${currency}/calculate`, requestOptions);
            
            const ari = await arires.json();
            setValue(ari);
            setDisabled(false);
        } catch (err) {
            setDisabled(true);
        }
    }

    useEffect(() => {
        rates();
        setTimeout(() => {
            setTimer(timer + 1);
        }, 20000);
    }, [fiat, currency, amount, timer])

    const start = async () => {
        if(!disabled) {
            window.dispatchEvent(
                new CustomEvent('ari10-widget-start-transaction-request', {
                    detail: {
                    buyCurrencyCode: currency ? currency : 'BSKT',
                    offerMoney: {
                        amount: amount,
                        currencyCode: fiat ? fiat : 'USD'
                    }}
                })
            );
        }
    }

    const handleInput = (e) => {
        if(e.target.value >= 100 && e.target.value <= 10000) {
            setAmount(parseFloat(e.target.value))
            setDisabled();
        } else {
            setDisabled(true);
        }
    }

  return (
    <>
      <Head>
        <title>BSKT Wymiana</title>
        <meta name="description" content="BSKT Wymiana" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script src="https://rk64tcf9ny.eu-west-1.awsapprunner.com/widget/main.min.js" />
        <script>var widget_id_6851681344231 = "aa044660-e663-444f-bc28-87e007c03e78"</script>
        <meta charSet="utf-8" />
      </Head>

      <div className={styles.main}>
      <Navbar />
      <div className={styles.wrapper}>
      <h2>Wymiana</h2>
            <div className={styles.panelwrapper}>
                <div className={styles.Type}>
                    <div className={`${styles.option} ${styles.selected}`}>
                        <span>Kup</span>
                    </div>
                    <div className={`${styles.option} ${styles.disabled}`}>
                        <span>Sprzedaj</span>
                    </div>
                </div>
                <div className={styles.Currency}>
                    <div className={`${styles.option} ${(currency === 'BSKT' || !currency) ? styles.selected : ''}`}
                        onClick={() => {setCurrency('BSKT')}}>
                        <span>BSKT</span>
                        <div className={styles.imgwrapper}><Image src='/round_logo.png' height={22} width={22} priority></Image></div>
                    </div>
                    <div className={`${styles.option} ${currency === 'BNB' ? styles.selected : ''}`}
                        onClick={() => {setCurrency('BNB')}}>
                        <span>BNB</span>
                        <div className={styles.imgwrapper}><Image src='/BNBIcon.png' height={22} width={22} priority></Image></div>
                    </div>
                    <div className={`${styles.option} ${currency === 'BUSD' ? styles.selected : ''}`}
                        onClick={() => {setCurrency('BUSD')}}>
                        <span>BUSD</span>
                        <div className={styles.imgwrapper}><Image src='/BUSDIcon.png' height={22} width={22} priority></Image></div>
                    </div>
                    <div className={`${styles.option} ${currency === 'USDC' ? styles.selected : ''}`}
                        onClick={() => {setCurrency('USDC')}}>
                        <span>USDC</span>
                        <div className={styles.imgwrapper}><Image src='/USDCIcon.png' height={22} width={22} priority></Image></div>
                    </div>
                </div>
                <div className={styles.Offer}>
                    <label htmlFor="cash">za</label>
                    <input type="number" name="cash" id="cash" onChange={handleInput} defaultValue={500} />
                    <div className={styles.fiat} onClick={() => {list ? setList(false) : setList(true)}}>
                        <Image src={`/${fiat}Icon.svg`} width={22} height={22} />
                        <span>{fiat ? fiat : 'USD'}</span>
                        <Image src='/Arrow-down.svg' width={22} height={22} priority></Image>
                        <div className={`${styles.list} ${list ? styles.active : ''}`}>
                            {fiat !== 'PLN' ? <div className={styles.opt} onClick={() => {setFiat('PLN')}}>
                                <Image src='/PLNIcon.svg' width={22} height={22} priority></Image>
                                <span>PLN</span>
                            </div> : ''}
                            {fiat !== 'USD' ? <div className={styles.opt} onClick={() => {setFiat('USD')}}>
                                <Image src='/USDIcon.svg' width={22} height={22} priority></Image>
                                <span>USD</span>
                            </div> : ''}
                            {fiat !== 'EUR' ? <div className={styles.opt} onClick={(e) => {setFiat('EUR')}}>
                                <Image src='/EURIcon.svg' width={22} height={22} priority></Image>
                                <span>EUR</span>
                            </div> : ''}
                        </div>
                    </div>
                </div>
                <div className={`${styles.Buy} ${disabled ? styles.disabled : ''}`} onClick={start}>Kup {value ? value.code === 'BNB' ? (value.amount).toFixed(8) : (value.amount).toFixed(2) : 0} {value ? value.code : 'BSKT'}</div>
            </div>
            </div>
          </div>
    </>
  )
}
