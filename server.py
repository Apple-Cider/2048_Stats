import tornado.ioloop
import tornado.web
import config

class MainHandler(tornado.web.RequestHandler):
	def get(self):
		print("rendering page...")
		self.render("viz.html")

#TODO: extract absolute path and reference from a non-repo config file
application = tornado.web.Application([
	(r"/", MainHandler),
	(r"/assets/(.*)", tornado.web.StaticFileHandler, {"path": config.assets_path}),
], debug=True)

if __name__ == "__main__":
	application.listen(8888)
	tornado.ioloop.IOLoop.instance().start()