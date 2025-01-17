import express from "express";
import { guild, GuildNotFoundError } from "../../models/guild";
import { logger } from "../../main";
import { medias } from "../../models/media";
import { users,user } from "../../models/user";

export type guild = {
  id: string, // id
  name: string, // ギルド名
  topic: string, // トピック
  icon: string, // アイコンのURL
  created_at: Date, // 作成日時
  updated_at?: Date, // アップロード日時
  deleted_at?: Date // 削除日時(使えるのかは未検証
}

export async function memberList(req: express.Request, res:express.Response){
  const re:Array<any> = await guild.searchJoinedGuildMembers(req.params.guildId).then((r) => {return r;}).catch((e)=>{logger.error(e);return [];});
  const resp = Array<any>();

  for (let i=0; i<re.length; i++){
    resp[i] = await users.get(re[i].usersId)
      .then((r) => {return r;})
      .catch((e) => {logger.error(e); return;});
  }

  return res.status(200).json(resp);
}
