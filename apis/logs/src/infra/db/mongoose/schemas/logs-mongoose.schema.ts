import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    origin: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, required: true },
    code: { type: String, required: false },
    request: { type: String, required: true },
    response: { type: String },
    createdAt: { type: Date, default: Date.now() },
});

schema.index({ origin: 1 });
schema.index({ key: 1 });
schema.index({ type: 1 });
schema.index({ code: 1 });
schema.index({ createdAt: 1 });

const LogsSchema = mongoose.model('log', schema, 'logs');

LogsSchema.createIndexes().then((res) => res);

LogsSchema.on('index', (e) => {
    if (e) console.log(e);
});

export { LogsSchema as LogSchema };
