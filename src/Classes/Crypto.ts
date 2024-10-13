class Crypto{
    public CryptoName: string;
    public CryptoPrice: number;
    public CrytpoVolume: number;
    public MarketCap: number;
    public CirculationSupply: number;
    public TotalSupply: number;
    public Exchange: Exchange;
    public CryptoHolding: cryptoBalance;


}
enum Exchange{
    Binance = 'Binance',
    Coinbase = 'Coinbase',
    Bybit = 'Bybit'
}