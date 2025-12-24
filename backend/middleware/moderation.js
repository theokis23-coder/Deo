const bannedWords = [
  'sexe', 'porn', 'nude', 'pornographique', 'xxx',
  'explicit', 'adult', 'porno', 'nudité',
  'pute', 'salope', 'fuck', 'bitch'
];

function containsBanned(text){
  if(!text) return false;
  const t = text.toLowerCase();
  return bannedWords.some(w => t.includes(w));
}

module.exports = function(req, res, next){
  const fieldsToCheck = [];

  if(req.body.content) fieldsToCheck.push(req.body.content);
  if(req.body.message) fieldsToCheck.push(req.body.message);
  if(req.body.bio) fieldsToCheck.push(req.body.bio);
  if(req.body.name) fieldsToCheck.push(req.body.name);

  for(const f of fieldsToCheck){
    if(containsBanned(f)){
      return res.status(400).json({ error: 'Contenu interdit selon les règles DEO.' });
    }
  }

  next();
};
