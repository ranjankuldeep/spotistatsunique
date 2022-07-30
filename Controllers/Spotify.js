const { default: axios } = require("axios");
require("dotenv").config();
const baseAdress = process.env.BASEADRESS;

console.log(baseAdress);
const fs = require("fs");

exports.getSingleTrack = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/tracks/3F7pBlPDi2jfr7f6NoeXeL`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((track) => {
        const data = track.data;
        const senddata=[
          {
            'title':data.album.name,
            'id':data.album.id,
            'album_id':1,
            'url':data.album.images[0][0]

          }
        ];
          console.log(data.album.name)
        res.status(200).json(senddata);
        console.log(track.data);
      })
      .catch(function err(err) {
        console.log("there is an error in fetching track");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/tracks/3F7pBlPDi2jfr7f6NoeXeL`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((track) => {
                      console.log(track);
                      const data = track.data;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
                console.log(err);
              });
          });
        }
      });
  });
};
exports.getUserShow = (req, res) => {
  fs.readFile("./.spotify-token", (err, token) => {
    console.log(token);
    axios
      .get(`${baseAdress}/v1/me/shows`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((show) => {
        console.log(show.data.items);
        const data = show.data.items;
        res.status(200).json({ data: data });
      })
      .catch(function err(err) {
        console.log("there is an error in fetching show");
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            if (err) {
              console.log(err);
            }
            console.log(token);
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
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
                console.log("no post method was sent");
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
        console.log("there is an error in fetching episodes");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
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
                      console.log(episodes);
                      const data = episodes.data.items;
                      res.status(200).json({ data: data });
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
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
      .then((Albums) => {console.log(Albums.data.items)
        const data=Albums.data.items;
    res.status(200).json({data:data})
    })
      .catch(function err(err) {
        console.log("there is an error in fetching track");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/albums`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((Albums) => {console.log(Albums.data.items)
                        const data=Albums.data.items;
                        res.status(200).json({data:data})
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
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
      .then((artist) => {console.log(artist.data.items)
        const data=artist.data.items;
    res.status(200).json({data:data})
    })
      .catch(function err(err) {
        console.log("there is an error in fetching track");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/top/artists`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((artist) => {console.log(artist.data.items)
                        const data=artist.data.items;
    res.status(200).json({data:data})
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
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
      .then((tracks) => {console.log(tracks.data.items)
        const data=tracks.data.items;
    res.status(200).json({data:data})
    })
      .catch(function err(err) {
        console.log("there is an error in fetching track");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/me/tracks`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((tracks) => {console.log(tracks.data.items)
                    const data=tracks.data.items;
                    res.status(200).json({data:data})
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
                console.log(err);
              });
          });
        }
      });
  });
};
exports.getUserPlaylist = (req, res) => {
  const user = req.user;
  console.log(user);
  fs.readFile("./.spotify-token", (err, token) => {
    axios
      .get(`${baseAdress}/v1/users/${user.spotifyId}/playlists`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((playlist) => {console.log(playlist.data.items)
    const data=playlist.data.items;
    res.status(200).json({data:data})
    })
      .catch(function err(err) {
        console.log("there is an error in fetching track");
        console.log(err);
        console.log(err.response.statusText === "Unauthorized");
        if (err.response.statusText === "Unauthorized") {
          fs.readFile("./refresh_token", "utf-8", (err, token) => {
            console.log(token);
            if (err) {
              console.log(err);
            }
            const headers = {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic OGJlN2ZiYWRiMTc1NDg5YjhjYzUwMzhmZjI4NGM2NTI6YmVjNTJlYmI4ZmI5NDFlY2ExYTAyN2M5OTExMTUyNjc=`,
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
                console.log(data);
                fs.writeFile("./.spotify-token", data.toString(), (err) => {
                  if (err) throw new Error("Failed to write Acess Token" + err);
                  axios
                    .get(`${baseAdress}/v1/users/${user.spotifyId}/playlists`, {
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${res.data.access_token}`,
                      },
                    })
                    .then((playlist) => {console.log(playlist.data.items)
                        const data=playlist.data.items;
    res.status(200).json({data:data})
                    })
                    .catch((err) => console.log("Again error ocurred"));
                });
              })
              .catch((err) => {
                console.log("no post method was sent");
                console.log(err);
              });
          });
        }
      });
  });
} 
