import User from "../models/user";
// import { IUploadFileInput } from "../interfaces/uploadFileInterface";

export const UploadImage = async ({ image_url }: IUploadFileInput): Promise<any> => {
    try {
        const data = await User.create({ image_url });
        return data;
    } catch (error) {
        throw error;
    }
};
