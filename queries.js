const Pool = require('pg').Pool
const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 5432,
});

const getPlayers = (req, res) => {
    pool
        .query('SELECT object_id, player_name FROM common_site_player')
        .then(
            results => res.status(200).json(results.rows)
        )
        .catch(
            e => res.status(500).send(e.stack)
        );
}

const updatePlayerNameById = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    if (id && name) {
        res.status(400).send('both id and name are required')
    }
    pool
        .query('UPDATE common_site_player SET player_name = $1 WHERE object_id = $2', [name, id])
        .then(
            results => res.status(200).send(`player_id with ${id} is called ${name} meow like a gThug`)
        )
        .catch(
            e => res.status(500).send(e.stack)
        );
}
//possible error error: duplicate key value violates unique constraint "common_site_player_player_name_key"
const replacePlayersInClipsById = (req, res) => {
    const replacement_id = parseInt(req.params.replace_id);
    const id_to_replace = parseInt(req.params.id);
    if (replacement_id && id_to_replace) {
        res.status(400).send('both ids are required')
    }
    pool.
        query('UPDATE common_site_stats SET player_id = $1 WHERE player_id = $2', [replacement_id, id_to_replace])
        .then(
            results => res.status(200).send(results)
        )
        .catch(
            e => res.status(500).send(e.stack)
        );
}
const getPlayerByIds = (req, res) => {
    const { id } = req.params;

    pool.query('SELECT object_id, player_name FROM common_site_player WHERE object_id =  ANY ($1)', [id], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results.rows);
    });
};

const getStatsById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT object_id, player_name FROM common_site_player WHERE object_id = ANY ($1)', [id.split(',')], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.status(200).json(results.rows);
    })
};

const updatePlayerById = (req, res) => {
    const { playerIds, replacementId } = req.body;
    pool.query('UPDATE common_site_stats SET player_id = $1 WHERE player_id = ANY ($2)', [replacementId, playerIds.split(',')], (error, results) => {
        if (error) {
            return res.status(500).send(error);
        }
        pool.query('DELETE FROM common_site_player WHERE object_id = ANY ($1)', [playerIds.split(',')], (error, results) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.status(201).send(`Users with Ids: ${playerIds} were consolidated with ${replacementId} and removed`);
        });
    });
}
const deleteVideo = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query('DELETE FROM common_site_stats WHERE player_id IN ($1)', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Clip deleted with ID: ${id}`);
    });
}
module.exports = {
    getPlayers,
    getPlayerByIds,
    replacePlayersInClipsById,
    updatePlayerNameById,
    getStatsById,
    updatePlayerById,
    deleteVideo
}