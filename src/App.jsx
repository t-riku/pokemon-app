import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import { useState, useEffect } from "react";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  // 最初のURL
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  // loading時の変数
  const [loading, setLoading] = useState(false);
  // ポケモンのデータを格納するためのuseState
  const [pokemonData, setPokemonData] = useState([]);
  // 次、前のURLを取得するためのuseState
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // データを取ってきてる時はtrueにしてloadingを表示
      setLoading(true);
      // マウント時に全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得し下に定義しているloadPokemonに引数としてres.resultsを設定。そうすることでさらにその中のURLの情報をとってこれる
      loadPokemon(res.results);
      // console.log(res.results);
      // 次、前のページのURLの情報をセットする。次へ、前へボタンを押すたびにマウントされその度に次、前のURLがセットされる
      setNextURL(res.next);
      setPrevURL(res.previous); //null
      // データを取ってこれたらfalseにしてポケモンのカードを表示
      setLoading(false);
    };
    // 最初のマウント時に実行
    fetchPokemonData();
  }, []);

  // 各ポケモンの詳細なデータを取得するための関数を定義
  const loadPokemon = async (data) => {
    // _pokemonDataにはURLが入っている
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)で一匹ごとの名前とさらに詳細なURLがとってこれる
        // console.log(pokemon);

        // pokemon.jsで定義したgetPokemonで詳細なurlをとってきて変数に定義
        let pokemonRecord = getPokemon(pokemon.url);

        // console.log(pokemon.url);

        // pokemonRecordに一匹一匹の詳細な情報が入っている
        return pokemonRecord;
      })
    );
    // setPokemonDataに一匹一匹の詳細なデータを格納
    setPokemonData(_pokemonData);
  };

  // pokemonDataにはとってきた1ページ20匹分の1匹ごとの詳細なデータが入っている
  // console.log(pokemonData);

  const handleNextPage = async () => {
    // ボタンを押した時はloadingIconを表示
    setLoading(true);
    // getAllPokemonに次のURLを引数として渡し、次のURLのポケモン20匹分の大まかな情報をとってきて定義したdataに渡す
    let data = await getAllPokemon(nextURL);

    // console.log(data)で次のURLの20匹分のデータを取ってこれる
    // console.log(data);

    // loadPokemonは1ページ分の大まかな情報をとってきたURLの中の情報をとってきてくれるからそこにURLの引数を定義
    await loadPokemon(data.results);

    // 次、前へボタンを押した時は忘れずに次、前のURLの情報をセットする
    setNextURL(data.next);
    setPrevURL(data.previous);

    // データが取り終わったらloadingをやめポケモンのカードを表示
    setLoading(false);
  };

  const handlePrevPage = async () => {
    // 最初のページではprevURLはないため、無かったら何も返さない
    if (!prevURL) return;

    // prevURLがある時
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          // <h1>ロード中...</h1>
          <div className="pokemonLoader">
            <div className="pokemonLoaderIcon"></div>
          </div>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {/* pokemonDataに1匹ごとの詳細な情報が入っているのでそれをmap関数である分だけ並べる */}
              {/* 子コンポーネントに引数として受け取ったpokemonをpokemon={pokemon}として情報を渡す */}
              {pokemonData.map((pokemon, index) => {
                return <Card key={index} pokemon={pokemon} />;
              })}
            </div>
            <div className="btnBox">
              <button onClick={handlePrevPage} className="btn">
                前へ
              </button>
              <button onClick={handleNextPage} className="btn">
                次へ
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
