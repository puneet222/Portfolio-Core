import Hits, { IHits } from "../models/Hits";
import { HitsType } from "../routes/routes.interface";

class HitsService {
    static getHits(userId: string) {
        try {
            return Hits.find({ user: userId });
        } catch (error) {
            throw error;
        }
    }

    static async updateHits(userId: string) {
        try {
            const hitsData: Array<IHits> = await Hits.find({ user: userId });
            if (hitsData.length > 0) {
                let updatedHits: IHits['hits'] = hitsData[0]["hits"] + 1;
                let _id: string = hitsData[0]["_id"];
                let newData: HitsType = {
                    hits: updatedHits
                }
                return Hits.findOneAndUpdate({ _id }, newData, { upsert: true });
            } else {
                let hits: IHits = new Hits({ hits: 1, user: userId });;
                return hits.save();
            }
        } catch (error) {
            throw error;
        }
    }

    static deleteHits(_id: string) {
        try {
            return Hits.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default HitsService;