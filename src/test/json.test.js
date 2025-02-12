import {parseAsync, stringifyAsync} from '../component'
import test from '../component/yastjson/test/test.json'
import {should} from 'chai'

const testJSON = JSON.stringify(test)

should()

describe('JSON tests', function () {
    it("should stringify JSON with emojis in it", async function () {
        const emoString = "This 👩🏼‍🎓 Student"
        let json = await stringifyAsync({emoString})
        let nativeJSON = JSON.stringify({emoString})
        json.should.eq(nativeJSON)
    })
    it("should verify that undefined values drops the key", async function () {
        let json = await stringifyAsync({a: 1, c: 2, d: undefined})
        json.should.eq('{"a":1,"c":2}')
    })
    it("should stringify JSON", async function () {
        let json = await stringifyAsync({a: 1, c: 2, d: 3})
        json.should.eq('{"a":1,"c":2,"d":3}')
    })
    it("should stringify empty strings", async function () {
        let data = {name: "person", extra_info: '{country:"",age:35}'}
        let json = await stringifyAsync(data)
        json.should.eq(JSON.stringify(data))
        console.log(JSON.stringify(data))
    })
    it("should parse JSON", async function () {
        let item = await parseAsync('{"a":1,"c":2,"d":3,"e":{"a":1}}')
        item.a.should.eq(1)
        item.d.should.eq(3)
        item.e.a.should.eq(1)
    })
    it("should parse whitespaced JSON", async function () {
        let item = await parseAsync('  {     "a":1, "c":2, "d":3, "e": {  "a": 1}  }')
        item.a.should.eq(1)
        item.d.should.eq(3)
        item.e.a.should.eq(1)
    })
    it("should parse realistic json", async function () {
        let item = await parseAsync(testJSON)
        item[0].friends.length.should.eq(3)
    })
    it("should be able to stringify complex JSON", async function () {
        let result = await stringifyAsync(test)
        result.should.eq(testJSON)
    })

})
