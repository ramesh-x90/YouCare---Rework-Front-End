from http.server import HTTPServer, BaseHTTPRequestHandler


class Serv(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'

        print(self.request)

        try:
            file_to_open = open(self.path[1:], "rb").read()
            self.send_response(200)
        except:
            file_to_open = b"File not found"
            self.send_response(404)
        self.end_headers()
        self.wfile.write(file_to_open)


httpd = HTTPServer(('localhost', 8080), Serv)
httpd.serve_forever()


# localhost:8080/
