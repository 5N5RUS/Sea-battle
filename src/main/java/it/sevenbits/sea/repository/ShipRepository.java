package it.sevenbits.sea.repository;
import it.sevenbits.sea.entity.Ship;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ShipRepository extends JpaRepository<Ship, Long>{
}
