import Certificate, { ICertificate } from "../models/Certificate";
import { INTERNAL_SERVER_ERROR } from "../appConstants";
import { CertificateType } from "../routes/routes.interface";

class CertificateService {
    static getAllCertificates() {
        try {
            return Certificate.find({});
        } catch (err) {
            throw err;
        }
    }

    static createCertificate(certificateData: CertificateType) {
        try {
            const certificate: ICertificate = new Certificate(certificateData);
            return certificate.save();
        } catch (error) {
            throw error;
        }
    }

    static updateCertificate(certificateData: CertificateType) {
        try {
            return Certificate.findOneAndUpdate(
                { _id: certificateData._id },
                certificateData,
                { upsert: true }
            );
        } catch (error) {
            throw error;
        }
    }

    static deleteCertificate(_id: string) {
        try {
            return Certificate.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default CertificateService;