import mongoose, { Schema, Document } from 'mongoose';

export interface IGridItem extends Document {
    title: string;
    description: string;
    className: string;
    imgClassName: string;
    titleClassName: string;
    img: string;
    spareImg: string;
    order: number;
}

const GridItemSchema: Schema = new Schema(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        className: { type: String, default: "" },
        imgClassName: { type: String, default: "" },
        titleClassName: { type: String, default: "" },
        img: { type: String, default: "" },
        spareImg: { type: String, default: "" },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.GridItem || mongoose.model<IGridItem>('GridItem', GridItemSchema);
