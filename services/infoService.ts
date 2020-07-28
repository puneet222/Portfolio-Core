import Info, { IInfo } from "../models/Info";
import { InfoType } from "../routes/routes.interface";

class InfoService {
    static getInfos() {
        try {
            return Info.find({}).sort({ date: -1 });
        } catch (error) {
            throw error;
        }
    }

    static createInfo(infoData: InfoType) {
        try {
            const info: IInfo = new Info(infoData);
            return info.save();
        } catch (error) {
            throw error;
        }
    }

    static updateInfo(infoData: InfoType) {
        try {
            return Info.findOneAndUpdate({ _id: infoData._id }, infoData, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    static deleteInfo(_id: string) {
        try {
            return Info.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default InfoService;