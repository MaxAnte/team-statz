const dataExample = {
  games: [
    {
      id: 0,
      enemy: "Veterans",
      ourScore: 100,
      enemyScore: 97,
      date: "01.01.2021",
      playersStats: [
        {
          id: 0,
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
            { x: 100, y: 200 },
            { x: 250, y: 150 },
            { x: 350, y: 220 }
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
            { x: 500, y: 220 },
            { x: 550, y: 130 },
            { x: 535, y: 320 }
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
      image_thumb: "player photo",
      age: 20,
      number: 23,
      gp: 20,
      gs: 18,
      mp: 35.5,
      pts: 28.8,
      oreb: 2,
      dreb: 6.5,
      // rebTotal => oreb + dreb
      ast: 12.2,
      blk: 0.7,
      stl: 0.9,
      fta: 10,
      ftm: 8,
      // ftRate => fta / ftm
      two_pa: 50,
      two_pm: 40,
      // twoRate => two_pa / two_pm
      three_pa: 20,
      three_pm: 10,
      // threeRate => three_pa / three_pm
      // fga => two_pa + three_pa
      // fgm => two_pm + three_pm
      // fgRate => fga / fgm
      tov: 2,
      fouls: 3,
      bestInPts: false,
      bestInReb: false,
      bestInAst: false,
      bestInBlk: false,
      bestInStl: false
    }
  ],
  teams: [
    {
      id: 0,
      name: "bbc",
      wins: 5,
      loses: 2
    },
    {
      id: 1,
      name: "vets",
      wins: 2,
      loses: 5
    },
    {
      id: 2,
      name: "war",
      wins: 7,
      loses: 0
    },
    {
      id: 3,
      name: "aid",
      wins: 1,
      loses: 6
    }
  ]
};
