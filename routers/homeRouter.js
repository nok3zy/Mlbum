import express from "express";
import routes from "../routes";
import { uploadImage } from "../middleware";
import {
  getHome,
  postHome,
  getJoin,
  postJoin,
  user,
  getGroup,
  postGroup,
  getUpload,
  postUpload,
  getPhoto,
  postPhoto,
  getInvite,
  postInvite,
  getMakeGroup,
  postMakeGroup,
  getDelete
} from "../controllers/homeController";

const homeRouter = express.Router();

homeRouter.get(routes.home, getHome);
homeRouter.post(routes.home, postHome);

homeRouter.get(routes.join, getJoin);
homeRouter.post(routes.join, postJoin);


homeRouter.get("/:id", user);

homeRouter.get(`/:id/makeGroup`,getMakeGroup);
homeRouter.post(`/:id/makeGroup`,postMakeGroup);

homeRouter.get("/:id/:group/invite", getInvite);
homeRouter.post("/:id/:group/invite", postInvite);

homeRouter.get("/:id/:group", getGroup);
homeRouter.post("/:id/:group", postGroup);

homeRouter.get("/:id/:group/upload", getUpload);
homeRouter.post("/:id/:group/upload", uploadImage, postUpload);

homeRouter.get("/:id/:group/:pic_code", getPhoto);
homeRouter.post("/:id/:group/:pic_code", postPhoto);

homeRouter.get("/:id/:group/:pic_code/delete", getDelete);

export default homeRouter;
