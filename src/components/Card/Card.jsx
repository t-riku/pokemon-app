import React, { useState } from "react";
import "./Card.css";
import Modal from "react-modal";
import { getPokemon } from "../../utils/pokemon.js";

// アプリのルートを識別するクエリセレクタを指定する。
Modal.setAppElement("#root");

// 親コンポーネントのpokemonをpropsとして受け取る
const Card = ({ pokemon }) => {
  // console.log(pokemon);
  // let pokemonSpecies = getPokemon(pokemon.species.url);
  // console.log(pokemonSpecies);
  // モーダルの表示状態と切り替える為にState(props)を準備
  // false = 非表示、数値 = 表示しているModalの番目とする
  const [modalIsOpen, setIsOpen] = useState(false);
  // const [stats, setStats] = useState([]);

  //どのモーダルを表示するのか操作するために関数を準備
  const openModal = () => {
    setIsOpen(true);
  };
  const afterOpenModal = () => {
    // モーダルが開いた後の処理
  };
  // shouldCloseOnEscやshouldCloseOnOverlayCliceを使う場合に設定が必要
  // モーダルを非表示の状態にするため、falseを指定する
  const closeModal = () => {
    setIsOpen(false);
  };

  // カラー定義
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#f0f6c6",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#E6E0D4",
    fairy: "#fceaff",
    poison: "#c6b2d9",
    bug: "#c9f8ea",
    dragon: "#97b3e6",
    psychic: "#e2befa",
    flying: "#ebebeb",
    fighting: "#f4e4c6",
    dark: "#c0c1bc",
    ghost: "#b0a5b6",
    normal: "#F5F5F5",
  };

  const iconColors = {
    fire: "#f87474 ",
    grass: "#98f89f",
    electric: "#e9f884",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#E6E0D4",
    fairy: "#fceaff",
    poison: "#b084d9",
    bug: "#c9f8ea",
    dragon: "#97b3e6",
    psychic: "#e2befa",
    flying: "#ebebeb",
    fighting: "#f4e4c6",
    dark: "#c0c1bc",
    ghost: "#b0a5b6",
    normal: "#F5F5F5",
  };

  // ポケモン情報からデータを格納
  // 名前の最初を大文字にする
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  // id番号の最初の2つは0をつける
  const id = pokemon.id.toString().padStart(3, "0");
  // 高さをm表示にし、小数点をつける
  const height = (pokemon.height / 10).toFixed(1);
  // 重さをkg表示にし、小数点をつける
  const weight = (pokemon.weight / 10).toFixed(1);
  // // colorsのkeyを配列に格納
  const main_types = Object.keys(colors);
  // // console.log(main_types);

  // ポケモンの複数または単体のタイプを格納
  const poke_types = pokemon.types.map((type) => type.type.name);
  // console.log(poke_types);

  // ポケモンの最初のタイプだけを格納
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  // console.log(type);

  // colorsに上記のtypeを格納。最初のタイプだけをそれぞれ格納できた
  const color = colors[type];
  // console.log(color);
  // const iconColor = iconColors[type];

  // console.log(pokemon.types.type);

  // modalスタイリング
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "5001",
    },

    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "90vw",
      height: "90vh",
      padding: "4rem",
      transform: "translate(-50%, -50%)",
      zIndex: "10000",
      boxShadow: "0 5px 16px rgba(0, 0, 0, 0.9)",
      background: color,
      borderRadius: "1rem",
    },
  };

  return (
    <div
      onClick={() => openModal()}
      className="card"
      style={{ backgroundColor: color }}
    >
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt={name} />
      </div>
      {/* <div className="cardImg">
        <img
          src={pokemon.sprites.other.official - artwork.front_default}
          alt=""
        />
      </div> */}
      <p className="cardId">No.{id}</p>
      <h3 className="cardName smallCardName">{name}</h3>
      <Modal
        closeTimeoutMS={200}
        contentLabel="modal"
        // isOpenがtrueならモダールが起動する
        isOpen={modalIsOpen}
        // モーダルが開いた後の処理を定義
        onAfterOpen={afterOpenModal}
        // モーダルを閉じる処理を定義
        onRequestClose={() => closeModal()}
        // スタイリングを定義
        shouldCloseOnEsc={true}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        key={id}
      >
        <div className="modal">
          <div className="modal__content">
            <div className="cardImg">
              <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <p className="cardId">No.{id}</p>
            <h3 className="cardName">{name}</h3>
            <div className="cardTypes">
              {/* タイプは複数ある可能性があるためmap関数で全部とってくる */}
              {pokemon.types.map((type) => {
                return (
                  <div
                    key={type.type.name}
                    className="type"
                    style={{ backgroundColor: iconColors }}
                  >
                    <span className="typeName">{type.type.name}</span>
                  </div>
                );
              })}
            </div>
            <div className="modal__content__grid">
              <div className="modal__content__left">
                <div className="cardData">
                  <p className="title">
                    重さ：{weight}
                    <span className="unit"> (kg)</span>
                  </p>
                </div>
                <div className="cardData">
                  <p className="title">
                    高さ：{height}
                    <span className="unit"> (m)</span>
                  </p>
                </div>
                <div className="cardData">
                  <div className="title">
                    特性：
                    {/* 特性は複数ある可能性があるためmap関数で全部とってくる */}
                    {pokemon.abilities.map((ability) => {
                      return (
                        <div key={ability.ability.name} className="abilities">
                          <span className="ability">
                            {ability.ability.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="modal__content__right">
                <div className="cardStats">
                  {/* 種族値は複数あるためmap関数で全部とってくる */}
                  {pokemon.stats.map((stat) => {
                    return (
                      <div key={stat.stat.name} className="stats">
                        <span className="stat">{stat.stat.name} :</span>
                        <span className="stat"> {stat.base_stat}</span>
                        {/* <span className="stat">合計種族値</span> */}
                        {/* <span className="stat"> {stats}</span> */}
                      </div>
                    );
                  })}
                  totalStat :
                  {pokemon.stats
                    .map((stat) => stat.base_stat)
                    .reduce((base_stat, acc) => base_stat + acc)}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => closeModal()}
            className="modal__btn__close__bottom"
            type="button"
          >
            CLOSE
          </button>

          <button
            onClick={() => closeModal()}
            className="modal__btn__close"
            type="button"
          ></button>
        </div>
      </Modal>
    </div>
  );
};

export default Card;
