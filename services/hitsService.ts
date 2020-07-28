import Hits, { IHits } from "../models/Hits";
import { HitsType } from "../routes/routes.interface";

class HitsService {
    static getHits() {
        try {
            return Hits.find({});
        } catch (error) {
            throw error;
        }
    }

    static async updateHits() {
        try {
            const hitsData: Array<IHits> = await Hits.find({});
            let hits: IHits = new Hits({ hits: 1 });;
            if (hitsData.length > 0) {
                let updatedHits: IHits['hits'] = hitsData[0]["hits"] + 1;
                let _id: string = hitsData[0]["_id"];
                let newData: HitsType = {
                    hits: updatedHits
                }
                return Hits.findOneAndUpdate({ _id }, newData, { upsert: true });
            } else {
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