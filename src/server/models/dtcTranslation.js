import mongoose from 'mongoose';

const { Schema } = mongoose;

const dtcTranslationSchema = new Schema(
  {
    category: {
      type: String
    },
    cautionMessage: {
      type: String
    },
    consumerTranslation: {
      type: String,
      required: true
    },
    customTranslations: [
      {
        cautionMessage: {
          type: String
        },
        clubCode: {
          type: String,
          required: true
        },
        consumerTranslation: {
          type: String
        },
        impactExpected: {
          type: String
        },
        priority: {
          type: String
        },
        recommendedAction: {
          type: String
        },
        techTranslation: {
          type: String
        },
        messageSms: {
          type: String
        },
        messageEmail: {
          type: String
        },
        goRating: {
          type: Number
        },
        tipMessage: {
          type: String
        },
        videos: [
          {
            title: {
              type: String,
              required: true
            },
            url: {
              type: String,
              required: true
            }
          }
        ]
      }
    ],
    dtc: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    standard: {
      type: String
    },
    vehicleStatus: {
      type: String
    },
    priority: {
      type: String,
      required: true
    },
    messageSms: {
      type: String
    },
    messageEmail: {
      type: String
    },
    recommendedAction: {
      type: String,
      required: true
    },
    impactExpected: {
      type: String,
      required: true
    },
    goRating: {
      type: Number
    },
    techTranslation: {
      type: String
    },
    tipMessage: {
      type: String
    },
    videos: [
      {
        title: {
          type: String,
          required: true
        },
        url: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true },
  { collection: 'dtcTranslation' }
);

export default mongoose.model(
  'DtcTranslation',
  dtcTranslationSchema,
  'dtcTranslation'
);
