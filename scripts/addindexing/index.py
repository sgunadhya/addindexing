from click import command, argument, group
from meilisearch import Client as SearchClient

SEARCH_URL = "http://127.0.0.1:7700"


@group()
def main():
    pass


@main.command("add")
@argument("document_path")
@argument("index_name")
def add_document(document_path, index_name):
    search_client = SearchClient(SEARCH_URL)
    index = search_client.get_index(index_name)
    if index:
        with open(document_path) as f:
            content = f.read().replace('\n', '')
            index.add_documents([{"content": content}])


def check_index_exists(client, index_name):
    return False


@main.command("new")
@argument("index_name")
def create_index(index_name):
    search_client = SearchClient(SEARCH_URL)
    search_client.create_index(uid=index_name, primary_key="{0}_id".format(index_name))


if __name__ == '__main__':
    main()
