"""TO-DO: Write a description of what this XBlock is."""


import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer,String
from xblock.fragment import Fragment



class MyXBlock(XBlock):



    display_name = String(default='Streaming Video', scope=Scope.settings)

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

        context = {
            'title': self.display_name,
        }


        html = self.resource_string("static/html/myxblock.html")
        frag = Fragment(html.format(self=self))


        frag.add_css(self.resource_string("static/css/myxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/myxblock.js"))
        frag.initialize_js('MyXBlock')
        return frag

    def studio_view(self,context=None):
        html = self.resource_string("static/html/myxblock_edit.html")
        frag = Fragment(html.format(self=self))

        frag.add_css(self.resource_string("static/css/myxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/myxblock.js"))
        frag.initialize_js('MyXBlock')
        return frag

    #def author_view(self,context=None):

        #    context = {
        #    'title': self.display_name,
        #}

        #html = self.resource_string("static/html/myxblock_author.html")
        #frag = Fragment(html.format(self=self))
        #frag.add_content(self,context)
        #frag.add_css(self.resource_string("static/css/myxblock.css"))
        #frag.add_javascript(self.resource_string("static/js/src/myxblock.js"))
        #frag.initialize_js('MyXBlock')
        #return frag

    # TO-DO: change this handler to perform your own actions.  You may need more
    # than one handler, or you may not need any handlers at all.
    @XBlock.json_handler
    def increment_count(self, data, suffix=''):
        """
        An example handler, which increments the data.
        """
        # Just to show data coming in...
        assert data['hello'] == 'world'

        self.count += 1
        self.display_name = self.display_name
        return {"count": self.count}

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
