import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		self.render("viz.html")
		
class AssetHandler(tornado.web.RequestHandler):
	def get(self):
		pass

application = tornado.web.Application([
	(r"/", MainHandler),
	(r"/assets/", AssetHandler),
])

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()