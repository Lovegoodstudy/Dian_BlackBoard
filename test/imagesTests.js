let should = require('should');
let assert = require('assert');
let request = require('supertest');


describe('Board Images API', function() {
    let url = 'http://localhost:3000';
    
    before(function(done) {
        done();
    });
    
    describe('Images APIs', function() {

        it('Should get images success', function(done){
            request(url)
                .get('/images')
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    console.log("success res==>",res.body);
                    // Should.js fluent syntax applied
                    done();
                });
        });
    });
});