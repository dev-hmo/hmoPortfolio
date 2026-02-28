import mongoose, { Schema, Document } from 'mongoose';

export interface ISkill extends Document {
    skills: string[];
    tools: string[];
}

const SkillSchema: Schema = new Schema(
    {
        skills: { type: [String], default: [] },
        tools: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);
