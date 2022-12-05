const { default: axios } = require("axios");
require("dotenv").config();
const baseAdress = process.env.BASEADRESS;

const fs = require("fs");

exports.getUserShow = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/me/shows`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((show) => {
        const data = show.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ........here`,
              },
            };
            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/shows`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((show) => {
                      console.log(show.data.items);
                      const data = show.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};

exports.getUserEpisodes = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/me/episodes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((episodes) => {
        console.log(episodes.data.items);
        const data = episodes.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log(err);
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic .....`,
              },
            };
            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/episodes`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((episodes) => {
                      const data = episodes.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};
exports.getUserAlbums = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/me/albums`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((Albums) => {
        const data = Albums.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log(err);
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic .....`,
              },
            };
            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/albums`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((Albums) => {
                      const data = Albums.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};

exports.getUserArtist = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/me/top/artists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((artist) => {
        const data = artist.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log(err);
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ....`,
              },
            };

            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/top/artists`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((artist) => {
                      const data = artist.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};

exports.getUserTracks = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/me/tracks`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((tracks) => {
        const data = tracks.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log(err);
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic .....`,
              },
            };
            let data = {
              grant_type: "refresh_token",
              refresh_token: `${token}`,
            };
            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;

                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/tracks`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((tracks) => {
                      const data = tracks.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};
exports.getUserPlaylist = (req, res) => {
  console.log(req);
  const user = req.user;

  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/users/${user.spotifyId}/playlists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((playlist) => {
        const data = playlist.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log(err);

        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ......`,
              },
            };

            axios
              .post("https://accounts.spotify.com/api/token", null, {
                params: {
                  grant_type: "refresh_token",
                  refresh_token: `${token}`,
                },
                headers: headers.headers,
              })
              .then((res) => {
                const data = res.data.access_token;

                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/users/${user.spotifyId}/playlists`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((playlist) => {
                      console.log(playlist.data.items);
                      const data = playlist.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      });
  });
};
