import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
    title: string;
    description: string;
    image: string;
    ghLink: string;
    demoLink: string;
    order: number;
}

const ProjectSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, default: "" },
        image: { type: String, default: "" },
        ghLink: { type: String, default: "" },
        demoLink: { type: String, default: "" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
