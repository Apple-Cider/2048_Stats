import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		print("rendering page...")
		self.render("viz.html")
		
class AssetHandler(tornado.web.RequestHandler):
	def get(self, stuff):
		print("accessing an asset... " + stuff)

		
application = tornado.web.Application([
	(r"/", MainHandler),
	#(r"/assets/(.*)", AssetHandler),
	(r"/assets/(.*)", tornado.web.StaticFileHandler, {"path": "C:/Users/enduser/Desktop/Documents/Programming/Javascript/2048_Stats/assets/"}),
])

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()