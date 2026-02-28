import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
    quote: string;
    name: string;
    title: string;
    order: number;
}

const TestimonialSchema: Schema = new Schema(
    {
        quote: { type: String, required: true },
        name: { type: String, required: true },
        title: { type: String, required: true },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
