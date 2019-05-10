var request = require('supertest');
var server = require('../server/server');

describe('/api/device/register', function () {
    it('should register a device successfully', function (done) {
        var close = server.start({ port: 80 }, test);

        function test(app) {
            request(app)
                .post('/api/device/register')
                .send({ token: "1" })
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    close.close(done);
                });
        }
    });
});
