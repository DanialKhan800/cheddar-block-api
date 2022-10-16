import {insertGameData, getAllGamesData, getGameByIDData} from '../services/game.service.js'


export const addGame = async (req, res) => { 
    try {
        const game = await insertGameData(req.body);

        if(game){
            res.status(200).json({message:"Game is added"});
        }else{
            res.status(500).json("Some thing is wrong in the game creation");
        }
        console.log("test")
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAllGames = async (req, res) => { 
    try {
        const games = await getAllGamesData();
        console.log(games)
        if(games){
            res.status(200).json({message:"All Games are fetched", data:games});
        }else{
            res.status(500).json("Some thing is wrong in the game fetching");
        }
        console.log("test")
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getGameByID = async (req, res) => { 
    try {
        const {gameid} =req.body
        const game = await getGameByIDData(gameid);
        console.log(game)
        if(game){
            res.status(200).json({message:"Games are fetched", data:game});
        }else{
            res.status(500).json("Some thing is wrong in the game fetching");
        }
        console.log("test")
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}