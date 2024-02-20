package it.sevenbits.sea_battle.services;

import it.sevenbits.sea_battle.entity.Session;
import it.sevenbits.sea_battle.repository.SessionRepository;
import it.sevenbits.sea_battle.services.interfaces.CrudService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService implements CrudService<Session> {

    private final SessionRepository sessionRepository;

    public SessionService(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public Optional<Session> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Session> getAll() {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public void remove(Session object) {

    }

    @Override
    public void update(Long id, Session objectToBeUpdated) {

    }

    @Override
    public void save(Session objectToSave) {

    }
}
