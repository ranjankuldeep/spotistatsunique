const router = require("express").Router();
const SpotifyControllers = require("../Controllers/Spotify");
router.get("/getUserShow", SpotifyControllers.getUserShow);
router.get("/getUserEpisodes", SpotifyControllers.getUserEpisodes);
router.get("/getUserArtist", SpotifyControllers.getUserArtist);
router.get("/getUserAlbums", SpotifyControllers.getUserAlbums);
router.get("/getUserTrack", SpotifyControllers.getUserTracks);
router.get("/getUserPlaylist", SpotifyControllers.getUserPlaylist);
module.exports = router;
