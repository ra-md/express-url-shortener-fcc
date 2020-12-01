const express = require('express');
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');

const router = express.Router();
const Url = require('../models/Url');

router.get('/shorturl/:shortUrl', async (req, res) => {
  try {
    let urlFromDb = await Url.findOne({ short_url: req.params.shortUrl });
    if (urlFromDb !== null) {
      return res.redirect(urlFromDb.original_url);
    } else {
      return res.json({ error: 'Wrong format' });
    }
  } catch (error) {
    res.json(error);
  }
});

router.post('/shorturl/new', async (req, res) => {
  const reqUrl = req.body.url;
  let url = await Url.findOne({ original_url: reqUrl }, '-_id -__v');

  if (validUrl.isWebUri(reqUrl) === undefined)
    return res.json({ error: 'Invalid url' });

  if (url !== null) return res.json(url);

  url = new Url({
    original_url: reqUrl,
    short_url: nanoid(5)
  });

  await url.save();
  return res.json(url);
});

module.exports = router;
