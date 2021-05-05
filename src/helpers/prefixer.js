module.exports = {
    prefix: (prefix = process.env.PREFIX_APP) => prefix.length === 0 ? '' : prefix
};