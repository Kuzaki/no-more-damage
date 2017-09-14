const Command = require('command');

module.exports = function NoMoreDamage(D){
	const command = Command(D);
	let SHOW_DAMAGE = true,
		cid;
	D.hook('S_LOGIN',3,e=>{cid=e.cid})
	D.hook('S_EACH_SKILL_RESULT',3,e=>{
		if(!SHOW_DAMAGE && e.cid.toString() != cid.toString()) return SHOW_DAMAGE;
	});

	command.add('showdmg',()=>{
		SHOW_DAMAGE = !SHOW_DAMAGE
		switch(SHOW_DAMAGE){
			case true:
				sysMsg('Damage is now being displayed');
				break;

			case false:
				sysMsg('Damage is no longer being displayed');
				break;
		}
	});

	function sysMsg(arg1){
		D.toClient('S_CHAT', 1, {
           	channel: 24,
           	authorID: 0,
           	unk1: 0,
           	gm: 0,
           	unk2: 0,
           	authorName: '',
           	message: '[NoMoreDamage] ' + arg1
        });
	}
}
