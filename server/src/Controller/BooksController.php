<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;

/**
 * Books Controller
 *
 * @property \App\Model\Table\BooksTable $Books
 */
class BooksController extends AppController
{
    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow(['index', 'view', 'isbn']);
    }


    /**
     * Index method
     *
     * @return \Cake\Network\Response|null
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Publishers', 'Users', 'Tags']
        ];
        $books = $this->paginate($this->Books);

        $this->set(compact('books'));
        $this->set('_serialize', ['books']);
    }

    /**
     * View method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|null
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $book = $this->Books->get($id, [
            'contain' => ['Publishers', 'Users', 'Tags']
        ]);

        $this->set('book', $book);
        $this->set('_serialize', ['book']);
    }

    /**
     * Add method
     *
     * @return \Cake\Network\Response|void Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $book = $this->Books->newEntity();
        if ($this->request->is('post')) {
            $book = $this->Books->patchEntity($book, $this->request->data);
            if ($this->Books->save($book)) {
                $this->Flash->success(__('The book has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The book could not be saved. Please, try again.'));
            }
        }
        $publishers = $this->Books->Publishers->find('list', ['limit' => 200]);
        $users = $this->Books->Users->find('list', ['limit' => 200]);
        $tags = $this->Books->Tags->find('list', ['limit' => 200]);
        $this->set(compact('book', 'publishers', 'users', 'tags'));
        $this->set('_serialize', ['book']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|void Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $book = $this->Books->get($id, [
            'contain' => ['Tags']
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $book = $this->Books->patchEntity($book, $this->request->data);
            if ($this->Books->save($book)) {
                $this->Flash->success(__('The book has been saved.'));
                return $this->redirect(['action' => 'index']);
            } else {
                $this->Flash->error(__('The book could not be saved. Please, try again.'));
            }
        }
        $publishers = $this->Books->Publishers->find('list', ['limit' => 200]);
        $users = $this->Books->Users->find('list', ['limit' => 200]);
        $tags = $this->Books->Tags->find('list', ['limit' => 200]);
        $this->set(compact('book', 'publishers', 'users', 'tags'));
        $this->set('_serialize', ['book']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Book id.
     * @return \Cake\Network\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $book = $this->Books->get($id);
        if ($this->Books->delete($book)) {
            $this->Flash->success(__('The book has been deleted.'));
        } else {
            $this->Flash->error(__('The book could not be deleted. Please, try again.'));
        }
        return $this->redirect(['action' => 'index']);
    }

    public function isbn()
    {
        $isbn = $this->request->params['pass'];

        $book = $this->Books->find('all')
            ->where(['isbn LIKE' => $isbn[0] . '%'])
            ->contain(['Publishers', 'Users', 'Tags']);
        $this->set('book', $book);

        /* von php auf json serialisieren */
        $this->set('_serialize', ['book']);
    }

    public function deleteByISBN ()
    {
        $isbn = $this->request->params['pass'];
        $this->request->allowMethod(['delete', 'post']);

        $book = $this->Books->find('all')
            ->where(['isbn ' => $isbn[0]])->first();
        $this->Books->delete($book);

        $this->set("book", "Book with ISBN" . $isbn[0] . " deleted successfully");

    }

    public function updateByISBN ()
    {
        $isbn = $this->request->params['pass'];
        $this->request->allowMethod(['put', 'post']);

        if ($this->request->is('put')) {
            $book = $this->Books->findByIsbn($isbn[0])->first();
            $this->Books->patchEntity($book, $this->request->data);
            $this->Books->save($book);
        }

        $this->set("book", $book);
        $this->set('_serialize', ['book']);
    }
}
