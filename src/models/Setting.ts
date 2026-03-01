import mongoose, { Schema, Document } from 'mongoose';

export interface ISetting extends Document {
    name: string;
    title: string;
    location: string;
    email: string;
    githubUsername: string;
    githubUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    bio: string;
}

const SettingSchema: Schema = new Schema(
    {
        name: { type: String, default: "" },
        title: { type: String, default: "" },
        location: { type: String, default: "" },
        email: { type: String, default: "" },
        githubUsername: { type: String, default: "" },
        githubUrl: { type: String, default: "" },
        linkedinUrl: { type: String, default: "" },
        twitterUrl: { type: String, default: "" },
        bio: { type: String, default: "" },
    },
    { timestamps: true }
);

export default mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);
