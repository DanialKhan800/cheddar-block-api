import { getGameByIDData } from "../services/game.service.js";
import { getUserDetails } from "../services/user.js";
import { getGamePoint, updateGamePoint } from "../services/gamepoint.js";
import {
  insertUserGameSessionData,
  updateGameSessionData,
} from "../services/gamesession.service.js";
import { updateAwardedSpins } from "../services/game.service.js";
import {
  getGameActivityData,
  insertGameActivityData,
  updateGameActivityTimestampData,
  updateGameActivityData,
} from "../services/gameactivity.service.js";

export const updateGameActivity = async (req, res) => {
  try {
    // const userid = req.userId;
    // const {
    //   user_id,
    //   game_id,
    //   session_id,
    //   awardedspin_left,
    //   game_free_spins,
    //   total_session_bet_amount,
    //   total_paid_spins,
    //   current_credit,
    //   status,
    //   amount,
    //   payline,
    //   bit_size,
    //   spin_type,
    //   gametimestamp,
    // } = req.body;

    const reqbody = req.body;
    const parseobj = Object.values(reqbody);
    const data = JSON.parse(parseobj);
    const user_id = data.user_id;
    const game_id = data.game_id
    const session_id = data.session_id;
    const awardedspin_left = data.awardedspin_left;
    const game_free_spins = data.game_free_spins;
    const total_session_bet_amount = data.total_session_bet_amount;
    const total_paid_spins = data.total_paid_spins;
    const current_credit = data.current_credit;
    const status = data.status;
    const amount = data.amount;
    const payline = data.payline;
    const bit_size = data.bit_size;
    const spin_type = data.spin_type;
    const gametimestamp = data.gametimestamp;

    // console.log(req.body, "....................Body request");
    const userobj = await getUserDetails(user_id);
    // console.log(userobj, "---------------userobject");
    const gameobj = await getGameByIDData(game_id);
    // console.log("gameobj-------------", gameobj);
    const awardedspin = await updateAwardedSpins(
      { _id: game_id },
      { bonusspins: awardedspin_left }
    );
    // console.log("awardedspin", awardedspin);
    const pointsobj = await updateGamePoint(userobj, current_credit);
    // console.log("pointsobj", pointsobj);
    const sessionobj = await updateGameSessionData(
      { userid: userobj, gameid: gameobj, _id: session_id },
      {
        totalbetsession: total_session_bet_amount,
        totalpaidspin: total_paid_spins,
      }
    );
    // console.log("sessionobj", sessionobj);
    const actobj = await updateGameActivityData(
      { userid: userobj, gameid: gameobj },
      {
        gametimestamp: gametimestamp,
        eventstatus: status,
        amount: amount,
        bitsize: bit_size,
        spintype: spin_type,
        player_paylines: payline,
      }
    );
    // console.log("actobj", actobj);
    if (actobj && sessionobj && pointsobj && awardedspin) {
      res.status(200).json({ message: "Game  activity is updated" });
    } else {
      res
        .status(200)
        .json({ message: "Error occured in Game  activity updation" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const startGameActivity = async (req, res) => {
  try {
    const userid = req.userId;
    const gameid = req.params.gameid;

    const userdetail = await getUserDetails(userid);
    // console.log(userdetail)
    const gamepointsobj = await getGamePoint(userdetail);
    // console.log(gamepointsobj);

    if (!gameid) {
      res.status(400).json({ message: "Please provide game id" });
    }
    const game = await getGameByIDData(gameid);
    // console.log(game)
    if (!game) {
      res.status(400).json({ message: "Please provide a valid game id" });
    }

    const sessionid = await insertUserGameSessionData({
      sessionid: Date.now(),
      userid: userdetail,
      gameid: game,
      totalbetsession: "0",
      totalpaidspin: "0",
      gametype: "slot",
    });
    // console.log(sessionid);
    let data = {};
    const checkactivity = await getGameActivityData(game, userdetail);
    // console.log(checkactivity,"check activity");
    if (checkactivity) {
      const timestamp = "" + Date.now();
      const timestampobje = await updateGameActivityTimestampData(
        game,
        userdetail,
        sessionid.sessionid
      );
      data = {
        game_id: game._id.toString(),
        AwardedSpins: userdetail.awardedspin,
        user_id: userdetail._id,
        token: gamepointsobj.points,
        session_id: sessionid._id,
        gametimestamp: sessionid.sessionid,
        in_activity_timer: checkactivity.inactivitytimer,
        Rtp: checkactivity.rtp,
        IsRtp: checkactivity.isrtp,
        bonus_spins: game.bonusspins,
        event_status: checkactivity.eventstatus,
        player_betperline: checkactivity.playerbetperline,
        player_paylines: checkactivity.player_paylines,
        pay_data: game.paydata,
        prob_data: game.probdata,
      };
    } else {
      const activityobj = await insertGameActivityData({
        userid: userdetail,
        gameid: game,
        gametimestamp: sessionid.sessionid,
        inactivitytimer: parseInt(process.env.INACTIVITYTIME),
        eventstatus: process.env.EVENTSTATUS,
        amount: 0,
        bitsize: 0,
        spintype: "N/A",
        rtp: process.env.RTP,
        isrtp: process.env.ISRTP,
        playerbetperline: parseInt(process.env.PLAYERBETPERLINE),
        player_paylines: parseInt(process.env.PLAYERPAYLINES),
      });
      data = {
        game_id: game._id.toString(),
        AwardedSpins: userdetail.awardedspin,
        user_id: userdetail._id,
        token: gamepointsobj.points,
        session_id: sessionid._id,
        gametimestamp: sessionid.sessionid,
        in_activity_timer: activityobj.inactivitytimer,
        Rtp: activityobj.rtp,
        IsRtp: activityobj.isrtp,
        bonus_spins: game.bonusspins,
        event_status: activityobj.eventstatus,
        player_betperline: activityobj.playerbetperline,
        player_paylines: activityobj.player_paylines,
        pay_data: game.paydata,
        prob_data: game.probdata,
      };
    }

    // console.log(data);
    res.status(200).json(data );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserGamePlayMode = async (req, res) => {
  try {
    const userid = req.userId;
    const userdetail = await getUserDetails(userid);
    if (userdetail) {
      console.log(userdetail);
      const data = {
        PlayModeState: userdetail.playmode,
        username: userdetail.name,
        profile_pic: userdetail.profilepicture,
      };
      res.status(200).json( data );
    } else {
      res
        .status(404)
        .json({ message: "Some thing went wrong", error: error.message });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "Some thing went wrong", error: error.message });
  }
};

export const getStartCrashGame = async (req, res) => {
  try {
    const userid = req.userId;
    const gameid = req.params.gameid;
    const userdetail = await getUserDetails(userid);
    // console.log(userdetail)
    const gamepointsobj = await getGamePoint(userdetail);
    // console.log(gamepointsobj);

    if (!gameid) {
      res.status(400).json({ message: "Please provide game id" });
    }
    const game = await getGameByIDData(gameid);
    // console.log(game)
    if (!game) {
      res.status(400).json({ message: "Please provide a valid game id" });
    }

    const sessionid = await insertUserGameSessionData({
      sessionid: Date.now(),
      userid: userdetail,
      gameid: game,
      totalbetsession: "0",
      totalpaidspin: "0",
      gametype: "crash",
    });

    if (userdetail && game && gamepointsobj && sessionid) {
      // console.log(userdetail)
      const data = {
        userid: userdetail._id,
        username: userdetail.name,
        gameid: game._id,
        profile_pic: userdetail.profilepicture,
        sessionid: sessionid._id,
        tokens: gamepointsobj.points,
      };
      res.status(200).json(data );
    } else {
      res
        .status(404)
        .json({ message: "Some thing went wrong", error: error.message });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "Some thing went wrong", error: error.message });
  }
};

export const updateCrashGame = async (req, res) => {
  try {
    const { userid, gameid, sessionid, tokens } = req.body;

    const userdetail = await getUserDetails(userid);
    // console.log(userdetail)
    // const gamepointsobj = await getGamePoint(userdetail);
    // // console.log(gamepointsobj);
    // if (!gameid) {
    //   res.status(400).json({ message: "Please provide game id" });
    // }
    const pointsobj = await updateGamePoint(userdetail, tokens);
    if (pointsobj) {
      res.status(200).json({ message: "Game tokens updated" });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (error) {
    res
      .status(404)
      .json({ message: "Some thing went wrong", error: error.message });
  }
};
