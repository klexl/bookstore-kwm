<?php
/**
 * Created by PhpStorm.
 * User: alexk
 * Date: 11.04.16
 * Time: 11:36
 */

namespace App\Controller;

use Cake\Network\Exception\UnauthorizedException;

class LoginController extends AppController {
    public function initialize()
    {
        $this->loadModel('Users');
        parent::initialize();

    }

    public function beforeFilter(Event $event)
    {
        parent::beforeFilter($event);
        $this->Auth->allow(['index', 'logout']);
    }

    public function index() {
        try {
            if(!isset($this->request->data['username'])) {
                throw new UnauthorizedException('Please enter username');
            }
            if(!isset($this->request->data['password'])) {
                throw new UnauthorizedException('Please enter password');
            }

            $username = $this->request->data['username'];
            $password = $this->request->data['password'];

            $hashedPW = Security::hash($password);

            $user = $this->Users->find('login', ['username' => $username, 'password' => $hashedPW]);
            if(!$user)
                throw new UnauthorizedException("Invalid login");

            $this->Auth->setUser($user->toArray());

        }
        catch (UnauthorizedException $e) {
            throw new UnauthorizedException($e->getMessage(), 401);
        }

        $this->set('user', $this->Auth->user());
        $this->set('_serialize', ['user']);
    }

    public function logout() {
        $this->Auth->logout();
        $this->set('message', 'logout successful');
        $this->set('_serialize', ['message']);
    }
}