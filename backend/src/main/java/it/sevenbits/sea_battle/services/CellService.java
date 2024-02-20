package it.sevenbits.sea_battle.services;

import it.sevenbits.sea_battle.entity.Cell;
import it.sevenbits.sea_battle.services.interfaces.CrudService;

import java.util.List;
import java.util.Optional;

public class CellService implements CrudService<Cell> {
    @Override
    public Optional<Cell> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Cell> getAll() {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public void remove(Cell object) {

    }

    @Override
    public void update(Long id, Cell objectToBeUpdated) {

    }

    @Override
    public void save(Cell objectToSave) {

    }
}
