import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IMatchBase {
  homeTeam: string;
  awayTeam: string;
  date: Date;
  status: 'UPCOMING' | 'LIVE' | 'FINISHED';
  homeScore: number;
  awayScore: number;
  highlights: string[];
}

export interface IMatch extends IMatchBase, Document {
  _id: Schema.Types.ObjectId;
}

const matchSchema = new Schema<IMatchBase>({
  homeTeam: {
    type: String,
    required: true
  },
  awayTeam: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['UPCOMING', 'LIVE', 'FINISHED'],
    default: 'UPCOMING'
  },
  homeScore: {
    type: Number,
    default: 0
  },
  awayScore: {
    type: Number,
    default: 0
  },
  highlights: [{
    type: String
  }]
}, {
  timestamps: true
});

export const Match: Model<IMatch> = mongoose.model<IMatch>('Match', matchSchema);
export default Match;
