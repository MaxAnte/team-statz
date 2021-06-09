import lebron from "./assets/images/players/lebron.png";
import stephen from "./assets/images/players/stephen.png";
import hakeem from "./assets/images/players/hakeem.png";
import nikola from "./assets/images/players/nikola.png";
import john from "./assets/images/players/john.png";

export const store = {
  games: [
    {
      id: 0,
      enemy: "Veterans",
      ourScore: 100,
      enemyScore: 97,
      date: "2021-05-10",
      time: "17:00",
      playersStats: [
        {
          id: 0,
          pts: 25,
          oreb: 2,
          dreb: 9,
          ast: 12,
          blk: 0,
          stl: 1,
          two_pa: 20,
          two_pm: 5,
          three_pa: 10,
          three_pm: 5,
          fta: 12,
          ftm: 10,
          tov: 1,
          fouls: 2,
          minutes: 20,
          coordinates: [
            { x: 200, y: 200, miss: true },
            { x: 270, y: 70, miss: true },
            { x: 470, y: 100, miss: false }
          ]
        },
        {
          id: 1,
          pts: 15,
          oreb: 4,
          dreb: 2,
          ast: 5,
          blk: 2,
          stl: 4,
          two_pa: 25,
          two_pm: 12,
          three_pa: 3,
          three_pm: 1,
          fta: 25,
          ftm: 22,
          tov: 2,
          fouls: 4,
          minutes: 30,
          coordinates: [
            { x: 200, y: 220, miss: true },
            { x: 250, y: 130, miss: false },
            { x: 235, y: 320, miss: false }
          ]
        }
      ]
    },
    {
      id: 1,
      enemy: "VTK",
      ourScore: 120,
      enemyScore: 70,
      date: "2021-05-15",
      time: "20:00",
      playersStats: [
        {
          id: 2,
          pts: 28,
          oreb: 2,
          dreb: 4,
          ast: 12,
          blk: 0,
          stl: 1,
          two_pa: 20,
          two_pm: 5,
          three_pa: 10,
          three_pm: 5,
          fta: 12,
          ftm: 10,
          tov: 1,
          fouls: 2,
          minutes: 20,
          coordinates: [
            { x: 200, y: 200, miss: true },
            { x: 270, y: 70, miss: true },
            { x: 470, y: 100, miss: false }
          ]
        },
        {
          id: 1,
          pts: 15,
          oreb: 4,
          dreb: 7,
          ast: 5,
          blk: 2,
          stl: 4,
          two_pa: 25,
          two_pm: 12,
          three_pa: 3,
          three_pm: 1,
          fta: 25,
          ftm: 22,
          tov: 2,
          fouls: 4,
          minutes: 30,
          coordinates: [
            { x: 200, y: 220, miss: true },
            { x: 250, y: 130, miss: false },
            { x: 235, y: 320, miss: false }
          ]
        }
      ]
    },
    {
      id: 2,
      enemy: "Warriors",
      ourScore: 92,
      enemyScore: 115,
      date: "2021-05-26",
      time: "21:00",
      playersStats: [
        {
          id: 4,
          pts: 28,
          oreb: 2,
          dreb: 6,
          ast: 12,
          blk: 0,
          stl: 1,
          two_pa: 20,
          two_pm: 5,
          three_pa: 10,
          three_pm: 5,
          fta: 12,
          ftm: 10,
          tov: 1,
          fouls: 2,
          minutes: 20,
          coordinates: [
            { x: 200, y: 200, miss: true },
            { x: 270, y: 70, miss: true },
            { x: 470, y: 100, miss: false }
          ]
        },
        {
          id: 3,
          pts: 15,
          oreb: 4,
          dreb: 2,
          ast: 5,
          blk: 2,
          stl: 4,
          two_pa: 25,
          two_pm: 12,
          three_pa: 3,
          three_pm: 1,
          fta: 25,
          ftm: 22,
          tov: 2,
          fouls: 4,
          minutes: 30,
          coordinates: [
            { x: 200, y: 220, miss: true },
            { x: 250, y: 130, miss: false },
            { x: 235, y: 320, miss: false }
          ]
        }
      ]
    },
    {
      id: 3,
      enemy: "Termits",
      ourScore: 99,
      enemyScore: 108,
      date: "2021-06-05",
      time: "18:30",
      playersStats: [
        {
          id: 4,
          pts: 28,
          oreb: 2,
          dreb: 6,
          ast: 12,
          blk: 0,
          stl: 1,
          two_pa: 20,
          two_pm: 5,
          three_pa: 10,
          three_pm: 5,
          fta: 12,
          ftm: 10,
          tov: 1,
          fouls: 2,
          minutes: 20,
          coordinates: [
            { x: 200, y: 200, miss: true },
            { x: 270, y: 70, miss: true },
            { x: 470, y: 100, miss: false }
          ]
        },
        {
          id: 0,
          pts: 15,
          oreb: 4,
          dreb: 2,
          ast: 5,
          blk: 2,
          stl: 4,
          two_pa: 25,
          two_pm: 12,
          three_pa: 3,
          three_pm: 1,
          fta: 25,
          ftm: 22,
          tov: 2,
          fouls: 4,
          minutes: 30,
          coordinates: [
            { x: 200, y: 220, miss: true },
            { x: 250, y: 130, miss: false },
            { x: 235, y: 320, miss: false }
          ]
        }
      ]
    }
  ],
  players: [
    {
      id: 0,
      name: "Lebron James",
      position: "SF",
      image_thumb: lebron,
      age: 35,
      number: 23,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 28.8,
      oreb: 2,
      dreb: 6.5,
      reb: 8.5,
      ast: 12.2,
      blk: 0.7,
      stl: 0.9,
      fta: 10,
      ftm: 8,
      two_pa: 50,
      two_pm: 40,
      three_pa: 20,
      three_pm: 10,
      tov: 2,
      fouls: 3,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    },
    {
      id: 1,
      name: "Nikola Jokic",
      position: "C",
      image_thumb: nikola,
      age: 24,
      number: 15,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 26.2,
      oreb: 7.3,
      dreb: 6.5,
      reb: 13.8,
      ast: 9.5,
      blk: 1.2,
      stl: 0.4,
      fta: 10,
      ftm: 8,
      two_pa: 50,
      two_pm: 40,
      three_pa: 20,
      three_pm: 10,
      tov: 2,
      fouls: 3
    },
    {
      id: 2,
      name: "Stephen Curry",
      position: "PG",
      image_thumb: stephen,
      age: 33,
      number: 33,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 35.6,
      oreb: 0,
      dreb: 6.5,
      reb: 6.5,
      ast: 8.2,
      blk: 0.2,
      stl: 2.2,
      fta: 10,
      ftm: 8,
      two_pa: 50,
      two_pm: 40,
      three_pa: 20,
      three_pm: 10,
      tov: 2,
      fouls: 3
    },
    {
      id: 3,
      name: "Hakeem Olajuwon",
      position: "C",
      image_thumb: hakeem,
      age: 27,
      number: 15,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 24.6,
      oreb: 6,
      dreb: 6.5,
      reb: 12.5,
      ast: 5.2,
      blk: 4.9,
      stl: 0.5,
      fta: 10,
      ftm: 8,
      two_pa: 50,
      two_pm: 40,
      three_pa: 20,
      three_pm: 10,
      tov: 2,
      fouls: 3
    },
    {
      id: 4,
      name: "John Stockton",
      position: "PG",
      image_thumb: john,
      age: 28,
      number: 12,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 22.6,
      oreb: 2,
      dreb: 4.2,
      reb: 6.2,
      ast: 10.2,
      blk: 0.2,
      stl: 2.5,
      fta: 10,
      ftm: 8,
      two_pa: 50,
      two_pm: 40,
      three_pa: 20,
      three_pm: 10,
      tov: 2,
      fouls: 3
    }
    // {
    //   id: 100,
    //   name: "Wilt Chamberlain",
    //   position: "C",
    //   image_thumb: '',
    //   pts: 55.6,
    //   reb: 25.5,
    //   ast: 20.2,
    // }
  ],
  teams: [
    {
      id: 0,
      name: "Basketball City",
      wins: 5,
      loses: 2
    },
    {
      id: 1,
      name: "Veterans",
      wins: 2,
      loses: 5
    },
    {
      id: 2,
      name: "Warriors",
      wins: 7,
      loses: 0
    },
    {
      id: 3,
      name: "Aidar",
      wins: 1,
      loses: 6
    }
  ]
};