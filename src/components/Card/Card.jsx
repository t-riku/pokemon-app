import React from "react";
import "./Card.css";
import Modal from "react-modal";

// 親コンポーネントのpokemonをpropsとして受け取る
const Card = ({ pokemon }) => {
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
  // const iconColors = {
  //   fire: "#f87474 ",
  //   grass: "#98f89f",
  //   electric: "#e9f884",
  //   water: "#DEF3FD",
  //   ground: "#f4e7da",
  //   rock: "#E6E0D4",
  //   fairy: "#fceaff",
  //   poison: "#b084d9",
  //   bug: "#c9f8ea",
  //   dragon: "#97b3e6",
  //   psychic: "#e2befa",
  //   flying: "#ebebeb",
  //   fighting: "#f4e4c6",
  //   dark: "#c0c1bc",
  //   ghost: "#b0a5b6",
  //   normal: "#F5F5F5",
  // };

  // ポケモン情報からデータを格納
  // 名前の最初を大文字にする
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  // id番号の最初の2つは0をつける
  const id = pokemon.id.toString().padStart(3, "0");
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
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <p className="cardId">No.{id}</p>
      <h3 className="cardName">{name}</h3>

      <div className="cardTypes">
        <div>タイプ</div>
        {/* タイプは複数ある可能性があるためmap関数で全部とってくる */}
        {pokemon.types.map((type) => {
          return (
            <div
              key={type.type.name}
              className="type"
              // style={{ backgroundColor: iconColor }}
            >
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">重さ：{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{pokemon.height}</p>
        </div>
        <div className="cardData">
          {/* <p className="title">特性：{pokemon.abilities[0].ability.name}</p> */}
          <div className="title">
            特性：
            {/* 特性は複数ある可能性があるためmap関数で全部とってくる */}
            {pokemon.abilities.map((ability) => {
              return (
                <div key={ability.ability.name} className="abilities">
                  <span className="ability">{ability.ability.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
