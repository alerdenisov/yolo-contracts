import bs58 from 'bs58'
import fetch from 'node-fetch'

const IdeaFactory = artifacts.require('./IdeaFactory.sol')
const IdeaDAO = artifacts.require('./IdeaDAO.sol')
const IToken = artifacts.require('./IToken.sol')

function ether(n) {
  return n * 1e18
}

function fromIPFS(hash) {
  const bytes = bs58.decode(hash)
  return bytes.slice(2, bytes.length);
}
function toIPFS(str) {
  const remove0x = str.slice(2, str.length);
  const bytes = Buffer.from(`1220${remove0x}`, "hex");
  const hash = bs58.encode(bytes);
  return hash;
}

contract('IdeaDAO', _accs => {
  const accounts = _accs
  const ownerSig = { from: accounts[0] }
  const buyerSig = { from: accounts[1] }

  //context
  let factory, dao, token

  async function makeContext() {
    factory = await IdeaFactory.new(ownerSig)
    const hash = fromIPFS("QmYpW8LW7QmV8fUuiRGiXfXQTGGJ9mbpmkxt2Dhfcdt2DG")
    const hexHash = hash.toString('hex')
    const createDaoTx = await factory.createIdea("Test idea", "TST", `0x${hexHash}`, ownerSig)
    const daoAddress = createDaoTx.logs.filter(l => l.event === 'NewIdea')[0].args.idea
    dao = IdeaDAO.at(daoAddress);
    const tokenAddress = await dao.token()
    token = IToken.at(tokenAddress)
  }  
  
  async function cleanContext() {
  }

  describe('create ideas', () => {
    before(makeContext)
    after(cleanContext)

    it('should create proper balance', async() => {
      const balance = await token.balanceOf(accounts[0])
      assert(balance.eq(ether(100)))
    })

    it('should be proper meta', async () => {
      const meta = toIPFS(await dao.meta())

      const result = await fetch(`https://ipfs.io/ipfs/${meta}`)
      const json = await result.json()
      assert(json.text === 'test')
    })
  })
})