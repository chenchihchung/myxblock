"""TO-DO: Write a description of what this XBlock is."""
import json

import pkg_resources
import requests
import MySQLdb
import time

from xblock.core import XBlock
from xblock.fields import Scope, Integer,String
from xblock.fragment import Fragment



class MyXBlock(XBlock):

    proxies = {
        #'http': 'http://10.10.1.10:3128',
        #'https': 'http://10.10.1.10:1080',
	#
	# master
        'http'  : '',
        'https' : '',
    }
    #display_name = String(default='Streaming Video', scope=Scope.settings)

    """
    TO-DO: document what your XBlock does.
    """
    # Johnson

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.

    # TO-DO: delete count, and define your own fields.
    count = Integer(
        default=0, scope=Scope.user_state,
        help="A simple counter, to show something happening",
    )

    href = String(
        default="href",scope=Scope.user_state,
        help ="This is test filed",
    )

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the MyXBlock, shown to students
        when viewing courses.
        """

        html = self.resource_string("static/html/myxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/myxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/myxblock.js"))
        frag.initialize_js('MyXBlock')
        return frag

    def studio_view(self,context=None):
        print ('$$$$$$ studio_view() $$$$$$$$')
        html = self.resource_string("static/html/myxblock_edit.html")
        frag = Fragment(html.format(self=self))

        frag.add_css(self.resource_string("static/css/myxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/myxblock.js"))
        frag.initialize_js('MyXBlock')
        return frag

    def author_view(self,context=None):

        html = self.resource_string("static/html/myxblock_author.html")
        frag = Fragment(html.format(self=self))

        frag.add_css(self.resource_string("static/css/myxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/myxblock_author.js"))
        frag.initialize_js('MyXBlock')
        return frag

    @XBlock.json_handler
    def get_username(self, data, suffix=''):
        print (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '@@@@@@@ get_username step 1 @@@@@@@@')
        db = MySQLdb.connect(host="localhost", user="root", passwd="", db="edxapp")
        sql = "SELECT username FROM auth_user"
        cursor = db.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        for record in results:
            col1 = record[0]
            print ('username -->'+col1)

        db.close()
        print (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + '@@@@@@@ get_username step 10 @@@@@@@@')
        return ({"username": "getUsername1"})

    @XBlock.json_handler
    def list_files(self,data,suffix=''):
        return({"listfiles":"10000"})

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):

        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        print('@@@@@@@ increment_count step1 @@@@@@@')
        assert data['hello'] == 'world'

        self.count += 1
        self.print_log()
        # print('@@@@@@@ increment_count step 2 @@@@@@@')
        # try:
        #     db = MySQLdb.connect(host="localhost", user="root", passwd="", db="edxapp")
        #     sql = "SELECT username FROM auth_user"
        #     cursor = db.cursor()
        #     cursor.execute(sql)
        #     results = cursor.fetchall()
        #     col1=''
        #     print('@@@@@@@ increment_count step 3 @@@@@@@')
        #     for record in results:
        #         col1 = record[0]
        #         print ('username -->'+col1)
        #
        #     db.close()
        #     print('@@@@@@@ increment_count step 4 @@@@@@@')
        # except MySQLdb.Error as e:
        #     print "dbconnect is Error %d: %s" % (e.args[0], e.args[1])
        # print('@@@@@@@ increment_count step 5 @@@@@@@')
        return {"count":self.count}
        #return {"count": self.count,"username":col1}

    @XBlock.json_handler
    def get_token(self, data, suffix=''):
        returndata = self.get_access_token()
        jsonObject = json.loads(returndata)
        #return {"access_token": jsonObject['access_token']};
        return {"access_token": jsonObject['access_token'], "expires_in":jsonObject['expires_in']}
        #return {"access_token": returndata}

    def print_log(self):
        print ('$$$$$$$$$$$$ print_log $$$$$$$$')

    def get_access_token(self):
        url = 'https://wamsprodglobal001acs.accesscontrol.windows.net/v2/OAuth2-13'
        r = requests.post(
            url,
            data = {
                'grant_type': 'client_credentials',
                'client_id': 'drcedx',
                'scope': 'urn:WindowsAzureMediaServices',
                'client_secret': 'oYVh8L+h8DieJ/HgEf6rNo4sohyxdGRV3SLP0oOBK5s='
            },
            proxies = self.proxies
        )
        return (r.text)
        #return json.loads(r.text)['access_token']
        #jsonObject = json.loads(r.text)
        #return jsonObject['access_token']

    #@XBlock.json_handler
    #def get_init_token(self, data , suffix=''):


    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("123MyXBlock",
             """<myxblock/>
             """),
            ("Multiple MyXBlock",
             """<vertical_demo>
                <myxblock/>
                <myxblock/>
                <myxblock/>
                </vertical_demo>
             """),
        ]
