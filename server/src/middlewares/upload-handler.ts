import multer, { memoryStorage, Options } from 'multer'

function uploadAudioConfig(...formats: string[]): Options {
  return {
    limits: { fileSize: 25 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
      const isMatch = formats.some((format) => format === file.mimetype)
      if (isMatch) callback(null, true)
      else callback(null, false)
    },
    storage: memoryStorage(),
  }
}

export const uploadAudio = multer(
  uploadAudioConfig('audio/mp3', 'audio/mp4', 'audio/wma', 'audio/m4a'),
)
